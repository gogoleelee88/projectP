import React from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';

const SearchResults = ({ results, onResultClick, query }) => {
  // Group results by type
  const groupedResults = results.reduce((acc, result) => {
    const type = result.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(result);
    return acc;
  }, {});

  // Order of result types to display
  const typeOrder = ['프로젝트', '내 프로젝트', '메뉴', '사용자', '상태', '블로그'];

  const getTypeIcon = (type) => {
    const iconMap = {
      '프로젝트': '📋',
      '내 프로젝트': '📁',
      '메뉴': '📱',
      '사용자': '👤',
      '상태': '💬',
      '블로그': '📝'
    };
    return iconMap[type] || '🔗';
  };

  const getTypeColor = (type) => {
    const colorMap = {
      '프로젝트': 'text-blue-600 bg-blue-50',
      '내 프로젝트': 'text-purple-600 bg-purple-50',
      '메뉴': 'text-green-600 bg-green-50',
      '사용자': 'text-orange-600 bg-orange-50',
      '상태': 'text-pink-600 bg-pink-50',
      '블로그': 'text-indigo-600 bg-indigo-50'
    };
    return colorMap[type] || 'text-gray-600 bg-gray-50';
  };

  const highlightText = (text, searchQuery) => {
    if (!searchQuery) return text;
    
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  const isExternalUrl = (url) => {
    return url && url.startsWith('http');
  };

  return (
    <div className="max-h-96 overflow-y-auto">
      {typeOrder.map(type => {
        const typeResults = groupedResults[type];
        if (!typeResults || typeResults.length === 0) return null;

        return (
          <div key={type} className="mb-4 last:mb-0">
            {/* Type Header */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-b sticky top-0">
              <span className="text-sm">{getTypeIcon(type)}</span>
              <span className="text-sm font-medium text-gray-700">{type}</span>
              <span className="text-xs text-gray-500">({typeResults.length})</span>
            </div>

            {/* Results */}
            <div className="divide-y divide-gray-100">
              {typeResults.map((result, index) => (
                <SearchResultItem
                  key={`${type}-${index}`}
                  result={result}
                  onClick={() => onResultClick(result)}
                  query={query}
                  highlightText={highlightText}
                  getTypeColor={getTypeColor}
                  isExternalUrl={isExternalUrl}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const SearchResultItem = ({ 
  result, 
  onClick, 
  query, 
  highlightText, 
  getTypeColor, 
  isExternalUrl 
}) => {
  return (
    <div
      className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors group"
      onClick={onClick}
    >
      {/* Icon */}
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getTypeColor(result.type)}`}>
        <span className="text-lg">
          {result.icon || (result.type === '프로젝트' ? '📋' : 
                          result.type === '메뉴' ? '📱' : 
                          result.type === '사용자' ? '👤' : '🔗')}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <div className="font-medium text-gray-800 group-hover:text-purple-600 transition-colors truncate">
            {highlightText(result.title, query)}
          </div>
          
          {/* External Link Indicator */}
          {isExternalUrl(result.url) && (
            <ExternalLink size={14} className="text-gray-400 flex-shrink-0" />
          )}
        </div>

        {/* Additional Info */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          {result.category && (
            <span className="truncate">{result.category}</span>
          )}
          
          {result.description && (
            <>
              {result.category && <span>•</span>}
              <span className="truncate">
                {highlightText(result.description, query)}
              </span>
            </>
          )}
        </div>

        {/* Type Badge */}
        <div className="flex items-center gap-2 mt-2">
          <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(result.type)}`}>
            {result.type}
          </span>
          
          {result.url && isExternalUrl(result.url) && (
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
              외부 링크
            </span>
          )}
        </div>
      </div>

      {/* Arrow Indicator */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <ArrowRight size={16} className="text-gray-400" />
      </div>
    </div>
  );
};

export default SearchResults;